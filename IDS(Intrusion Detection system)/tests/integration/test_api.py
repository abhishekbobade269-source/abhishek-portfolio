from __future__ import annotations

from collections.abc import AsyncIterator

import pytest
import pytest_asyncio
from httpx import ASGITransport, AsyncClient

from nids.api.main import create_app


@pytest_asyncio.fixture
async def client() -> AsyncIterator[AsyncClient]:
    """An httpx client wired to the app over ASGI, with the app's lifespan
    (which sets up `app.state.nids`) actually driven — plain
    `ASGITransport` does not run lifespan on its own.
    """
    app = create_app()
    async with app.router.lifespan_context(app):
        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as ac:
            yield ac


@pytest.mark.asyncio
async def test_health_endpoint_does_not_require_database(client: AsyncClient) -> None:
    response = await client.get("/system/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


@pytest.mark.asyncio
async def test_capabilities_endpoint_reports_rule_count(client: AsyncClient) -> None:
    response = await client.get("/system/capabilities")

    assert response.status_code == 200
    body = response.json()
    assert body["rules_loaded"] >= 5


@pytest.mark.asyncio
async def test_list_alerts_round_trip(client: AsyncClient, require_database: None) -> None:
    response = await client.get("/alerts", params={"limit": 5})

    assert response.status_code == 200
    assert isinstance(response.json(), list)

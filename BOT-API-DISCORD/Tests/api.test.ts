import { initApi } from "../Api";

it('Returns 404 on unknown route', async () => {
    const api = initApi();
    const req = await fetch('http://localhost:8081');
    expect(req.status).toStrictEqual(404);
    api.close();
});
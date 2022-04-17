import {tokenIdBy} from "./contractUtils";

test('can get tokenId', async () => {
    const tokenId = await tokenIdBy('0x8ae7bbe753bf0f447b5bb5b4290b98a2501a880ce1ddb3c89624a4023218f459');
    expect(tokenId).toEqual(36)
});

test('can not get tokenId for wrong transaction', async () => {
    const tokenId = await tokenIdBy('0x8ae7bbe753bf0f447b5bb5b4290b98a2501a880ce1ddb3c89624a4023218f450');
    expect(tokenId).toBeUndefined()
});

test('can not get tokenId for out of gas transaction', async () => {
    const tokenId = await tokenIdBy('0x2a4f53dbf89514be0512ec5eda4dd0ef21e973c23b0de7fda896988883d4154b');
    expect(tokenId).toBeUndefined()
});
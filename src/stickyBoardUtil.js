export function getStickyBoardFromLocalStorage(board_id)
{
    return JSON.parse(localStorage.getItem(board_id));
}
export function setStickyNotesToLocalStorage(boardid, board, lastLen)
{
    console.log(boardid, lastLen, board);
    if(boardid !== null)
    {
        localStorage.setItem(boardid, JSON.stringify(board));
    }
    localStorage.setItem("lastIDSB",lastLen);
}
export function getLastLengthForStickyBoardFromLocalStorage()
{
    return localStorage.getItem("lastIDSB") !== null ?parseInt(localStorage.getItem("lastIDSB")):0;
}
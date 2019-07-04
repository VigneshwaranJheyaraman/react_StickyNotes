export function setLocalStorage(lastTaskId, notes, checkList)
{
    localStorage.setItem("lastId", lastTaskId.toString());
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("checkList", JSON.stringify(checkList));
}

export function setBoardCountToLocalStorage(nB)
{
    localStorage.setItem("nB", nB);
}
export function getBoardFlagFromLocalStorage()
{
    return localStorage.getItem("nB")!== null?parseInt(localStorage.getItem("nB")):0;
}
export function getLastIdfromLocalStorage()
{
    return localStorage.getItem("lastId") !== null ? parseInt(localStorage.getItem("lastId")) : 0;
}
export function getStickyNotesFromLocalStorage()
{
    return localStorage.getItem("notes") !==  null ? JSON.parse(localStorage.getItem("notes")) : {};
}
export function getCheckListFromLocalStorage()
{
    return localStorage.getItem("checkList") !== null ? JSON.parse(localStorage.getItem("checkList")) : {};
}
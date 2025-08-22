export function formateDate(date){
    return date.toLocaleDateString("en-IN",{
        month:"short",
        day:"numeric",
        year:"numeric",
    })
}
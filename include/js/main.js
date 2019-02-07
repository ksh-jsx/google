function mkPlan()
{

    document.getElementById("addInfo").style.display="block";
    document.getElementById("timeLine").style.display="none";

}

function ok()
{
    if(confirm("저장하시겠습니까?")==true)
    {
    document.getElementById("addInfo").style.display="none";
    document.getElementById("timeLine").style.display="block";
    }
    else
        return;
}

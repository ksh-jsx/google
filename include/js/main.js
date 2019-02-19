var ob;
function mkPlan()
{
    document.getElementById("cancel").style.display="block";
    document.getElementById("add").style.display="none";
    document.getElementById("backbtn").style.display="block";
    document.getElementById("plusbtn").style.display="none";
    document.getElementById("addInfo").style.display="block";
    document.getElementById("timeLine").style.display="none";
}

function back()
{
    document.getElementById("cancel").style.display="none";
    document.getElementById("add").style.display="block";
    document.getElementById("backbtn").style.display="none";
    document.getElementById("plusbtn").style.display="block";
    document.getElementById("addInfo").style.display="none";
    document.getElementById("timeLine").style.display="block";
}

function push(ob,img)
{
    document.getElementById(ob).style.backgroundColor = "#A9E2F3";
    document.getElementById(ob).style.color = "#FFFFFF";
    if( document.getElementById(img).src.indexOf('Above') != -1)
    {
        document.getElementById(img).src = "../images/line_sky_nonAbove.png";
    }
    else if( document.getElementById(img).src.indexOf('Bottom') != -1)
    {
        document.getElementById(img).src = "../images/line_sky_nonBottom.png";
    }
    else if( document.getElementById(img).src.indexOf('dot') != -1)
    {
        document.getElementById(img).src = "../images/line_sky_dot.png";
    }
    else
    {
        document.getElementById(img).src = "../images/line_sky.png";
    }
}
<%
    if(session.getAttribute("account") == null) {
        response.sendRedirect("/");
        return;
    }
%>

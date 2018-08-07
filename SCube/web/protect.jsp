<%
    if(session.getAttribute("account") == null) {
        response.sendRedirect("login.jsp");
        return;
    }
%>

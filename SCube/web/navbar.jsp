<%@page import="scube.entities.Account"%>
<div class="top_nav" style=" font-family: Oswald;">
    <div class="nav_menu">
        <nav>
            <ul class="nav navbar-nav navbar-right">
                <li>
                    <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                        <img src="assets/images/man.png" alt=""><%= ((Account)session.getAttribute("account")).getName() %>
                        <span class=" fa fa-angle-down"></span>
                    </a>
                    <ul class="dropdown-menu dropdown-usermenu pull-right">
                        <li><a href="resetPassword.jsp"><i class="fa fa-refresh pull-right"></i> Reset Password</a></li>
                        <li><a href="logout.jsp"><i class="fa fa-sign-out pull-right"></i> Log Out</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    </div>
</div>
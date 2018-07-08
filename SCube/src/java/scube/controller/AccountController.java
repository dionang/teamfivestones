/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package scube.controller;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import scube.dao.AccountDAO;
import scube.dao.CompanyDAO;
import scube.entities.*;

/**
 *
 * @author Dion
 */
@WebServlet(name = "AccountController", urlPatterns = {"/createAccount", "/setDatasource"})
public class AccountController extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HttpSession session = request.getSession();
        Account account = (Account) session.getAttribute("account");
                    
        String operation = request.getParameter("operation");
        try(PrintWriter out = response.getWriter()){
            if(operation.equals("createAccount")){
                String name = request.getParameter("name");
                String username = request.getParameter("username");
                String password = request.getParameter("password");
                String accountType = request.getParameter("accountType");
                boolean status = AccountDAO.addAccount(username, password, account.getCompanyId(), accountType, name);
                out.print(status);                 
            } else if (operation.equals("setDatasource")){
                String datasource = request.getParameter("datasource");
                int companyId = Integer.parseInt(request.getParameter("companyId"));
                boolean status = CompanyDAO.setDatasource(datasource, companyId);
                response.sendRedirect("devHome.jsp" + (status ? "" : "?error=true"));
            }
        }
        
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

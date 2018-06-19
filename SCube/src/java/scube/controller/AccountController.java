/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package scube.controller;

import java.io.IOException;
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
@WebServlet(name = "AccountController", urlPatterns = {"/createUser", "/setDatasource"})
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
        
        String operation = request.getParameter("operation");
        if(operation.equals("createUser")){
            String name = request.getParameter("name");
            String username = request.getParameter("username");
            String password = request.getParameter("password");
            AccountDAO.addAccount(username, password, 1, "user", name);
            sendRedirect(request, response);
        } else if (operation.equals("setDatasource")){
            String datasource = request.getParameter("datasource");
            int companyId = Integer.parseInt(request.getParameter("companyId"));
            boolean success = CompanyDAO.setDatasource(datasource, companyId);
            
            if(success) {
                sendRedirect(request, response);
            }
        } else if (operation.equals("register")){
            // for testing purposes
            AccountDAO.addAccount("test", "123", 1, "user", "Report Generator");
            response.sendRedirect("login.jsp");
        }
        
    }
    
    public void sendRedirect(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpSession session = request.getSession();
        Account account = (Account) session.getAttribute("account");
        if (account == null){
            response.sendRedirect("/");
        } else if (account instanceof Developer) {
            response.sendRedirect("devHome.jsp");
        } else if (account instanceof Manager) {
            response.sendRedirect("managerHome.jsp");
        } else if (account instanceof User) {
            response.sendRedirect("userHome.jsp");
        } else {
            response.sendRedirect("dashboard.jsp");
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

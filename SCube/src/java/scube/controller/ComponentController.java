/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package scube.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import scube.dao.ComponentDAO;
import scube.entities.Component;

/**
 *
 * @author Dion
 */
@WebServlet(name = "ComponentController", urlPatterns = {"/saveTemplate"})
public class ComponentController extends HttpServlet {

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
//        String operation = request.getParameter("operation");
//        if(operation.equals("saveComponents")){
//            String name = request.getParameter("name");
//            String username = request.getParameter("username");
//            String password = request.getParameter("password");
//            String accountType = request.getParameter("accountType");
//            boolean status = AccountDAO.addAccount(username, password, account.getCompanyId(), accountType, name);
//            switch(accountType) {
//                case "developer" :  response.sendRedirect("createDevAccount.jsp" + (status ? "" : "?error=true"));
//                                    break;
//                case "manager"   :  response.sendRedirect("createManagerAccount.jsp" + (status ? "" : "?error=true"));
//                                    break;
//                case "user"      :  response.sendRedirect("createUserAccount.jsp" + (status ? "" : "?error=true"));
//                                    break;                    
//            }
//        } else if (operation.equals("setDatasource")){
//            String datasource = request.getParameter("datasource");
//            int companyId = Integer.parseInt(request.getParameter("companyId"));
//            boolean status = CompanyDAO.setDatasource(datasource, companyId);
//            response.sendRedirect("devHome.jsp" + (status ? "" : "?error=true"));
//        }
        ArrayList<Component> components = new ArrayList<>();
//            public Component(String id, String type, int page, double x, double y, double height, double width){
        components.add(new Component("textbox1", "textbox",1,5.0,3.0,5.0,3.0));
        components.add(new Component("textbox2", "textbox",1,4.0,3.0,5.4,3.0));
        components.add(new Component("textbox3", "textbox",1,5.0,3.2,5.0,3.5));
        ComponentDAO.saveComponents(components, 1);
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

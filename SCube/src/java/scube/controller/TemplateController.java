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
import scube.dao.ComponentDAO;
import scube.dao.ReportDAO;

/**
 *
 * @author ZhenDan
 */
@WebServlet(name = "TemplateController", urlPatterns = {"/createTemplate", "/loadTemplate", "/templateControl"})
public class TemplateController extends HttpServlet {

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
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            String operation=request.getParameter("operation");
            int id;
            if(operation.equals("templateControl")){
                String viewBtn = request.getParameter("viewBtn");
                if(viewBtn != null){
                    id=Integer.parseInt(request.getParameter("templateId"));
                    request.setAttribute("templateId", id);
                    request.getRequestDispatcher("loadTemplate.jsp").forward(request, response);
                } 

                String deleteBtn = request.getParameter("deleteBtn");
                if(deleteBtn != null){
                    id=Integer.parseInt(request.getParameter("id"));
                    boolean deleteComponents = ComponentDAO.deleteAllComponents(id);
                    boolean deleteTemplate  = ReportDAO.deleteTemplate(id);
                    out.print(deleteComponents && deleteTemplate);
                }

            } else if(operation.equals("createTemplate")){
                String templateName   = request.getParameter("templateName");
                String templateSize   = request.getParameter("templatesize");
                String templateLayout = request.getParameter("templatelayout");
                int companyId = Integer.parseInt(request.getParameter("companyId"));
                String userName = request.getParameter("userName");
                boolean result=ReportDAO.createTemplate(companyId, templateName, userName, templateSize, templateLayout);
                String templateId=null;
                if (result){
                   templateId=ReportDAO.retrieveTemplateId();
                }
                out.print(templateId);
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

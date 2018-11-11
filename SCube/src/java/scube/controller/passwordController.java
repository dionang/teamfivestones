/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package scube.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import scube.dao.AccountDAO;
import scube.dao.EmailDAO;
import javax.mail.*;
import scube.entities.Account;
import scube.entities.StringGenerator;

/**
 *
 * @author ZhenDan
 */
@WebServlet(name = "passwordController", urlPatterns = {"/passwordController","/resetPassword","/password"})
public class passwordController extends HttpServlet {

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
//         try(PrintWriter out = response.getWriter()){
//       String operation = request.getParameter("operation");
//       if (operation.equals("resetPassword")) {
//                String username = request.getParameter("username");
//                String email=request.getParameter("email");
//                Account account = AccountDAO.getAccountByUsername(username);
//                
//                String[] result=new String[2];
//                if (account != null) {
//                    int accountId = account.getAccountId();
//                    StringGenerator generator = new StringGenerator();
//                    String randomString = generator.generateRandomString();
//                    boolean resetPassword = AccountDAO.changePassword(accountId, randomString);
//                    if (resetPassword) {
//                        EmailDAO.sendPassowrd(email, "Reset Password", randomString);
//                        result[0]="true";
//                        result[1]="A new password is sent to successfully sent to your email!!";
//                    }else{
//                        result[0]="false";
//                        result[1]="ERROR!!!Password can't be reset";
//                    }
//                } else {
//                    result[0]="false";
//                    result[1]="ERROR!!!Invalid User Name";   
//                }
//                out.print(result[0]);
//            }
//        
//         }
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
        try(PrintWriter out = response.getWriter()){
       String operation = request.getParameter("operation");
       if (operation.equals("forgetPassword")) {
                String username = request.getParameter("username");
                String email=request.getParameter("email");
                Account account = AccountDAO.getAccountByUsername(username);
                
                String[] result=new String[2];
                if (account != null) {
                    int accountId = account.getAccountId();
                    StringGenerator generator = new StringGenerator();
                    String randomString = generator.generateRandomString();
                    boolean resetPassword = AccountDAO.changePassword(accountId, randomString);
                    if (resetPassword) {
                        try{
                            EmailDAO.sendPassowrd(email, "New generated Password", randomString);
                            result[0]="true";
                            result[1]="A new password is successfully sent to your email!!";
                        }catch(MessagingException mex){
                            System.out.println("Error with email " + mex);
                            result[0]="false";
                            result[1]="Error with email!!";
                           
                        } 
                       
                    }else{
                        result[0]="false";
                        result[1]="ERROR!!! Password can't be reset";
                    }
                } else {
                    result[0]="false";
                    result[1]="ERROR!!! Invalid User Name"; 
 
                }
                out.print(result[0]+","+result[1]);
            }else if(operation.equals("resetPassword")){
                String username = request.getParameter("username");
                String password=request.getParameter("password");
                Account account = AccountDAO.getAccountByUsername(username);
                boolean result=false;
                if (account != null) {
                    int accountId = account.getAccountId();
                    result = AccountDAO.changePassword(accountId, password);
                    
                }
                out.print(result);
            }
        
         }
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

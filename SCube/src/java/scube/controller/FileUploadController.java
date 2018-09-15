/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package scube.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

/**
 *
 * @author Dion
 */
@WebServlet(name = "FileUploadController", urlPatterns = {"/saveFile"})
@MultipartConfig
public class FileUploadController extends HttpServlet {
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
        response.setContentType("text/html;charset=UTF-8");

        try (PrintWriter out = response.getWriter()) {
            String servletPath = request.getServletContext().getRealPath("/");
            String rootPath = servletPath.split("SCube")[0];

            // get the file data and file name
            Part filePart = request.getPart("file"); 
            String fileName = filePart.getSubmittedFileName();
            
            // declare the input and output streams, and write the file to the folder
            InputStream input = filePart.getInputStream();
            
            // output folder is on the server ROOT images folder
            try (FileOutputStream output = new FileOutputStream(new File(rootPath + "ROOT" + File.separator + "images", fileName))) {
                int bytesRead = 0;
                byte[] buffer = new byte[4096];
                while ((bytesRead = input.read(buffer)) != -1) {
                    output.write(buffer, 0, bytesRead);
                }
                out.print("upload success");
            } catch (IOException e){
                out.print("upload failed");
                System.out.print(e.getMessage());
            } finally { // release resources
                if (input != null) {
                    input.close();
                }
            }
        }
    }
}

package com.scube.tutorial;

import java.io.IOException;
import java.io.PrintWriter;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class SCubeServlet
 */
@WebServlet("/SCubeServlet")
public class SCubeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@EJB
	SCubeSessionBean scubeSessionBean;
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("entering doGet method:");
		PrintWriter out = response.getWriter();
		out.println(scubeSessionBean.scubeSessionBeanMethod());
		System.out.println("exiting doGet method:");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}

package com.scube.tutorial;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;

@Stateless
@LocalBean
public class SCubeSessionBean {
	public String scubeSessionBeanMethod() {
		return "sessionbeanmethod executed";
	}
 
}

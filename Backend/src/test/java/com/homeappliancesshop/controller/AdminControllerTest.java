package com.homeappliancesshop.controller;

import com.homeappliancesshop.model.Admin;
import com.homeappliancesshop.service.AdminService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AdminControllerTest {
    @InjectMocks
    private AdminController adminController;

    @Mock
    private AdminService adminService;

    @BeforeEach
    void setUp() { MockitoAnnotations.openMocks(this); }

    @AfterEach
    void clear() { reset(adminService); }

    @Test
    void getAdmins() {
        List<Admin> expectedAdmins = new ArrayList<>();
        when(adminService.findAllAdmins()).thenReturn(expectedAdmins);

        List<Admin> result = adminController.getAdmins();

        assertEquals(expectedAdmins, result);
        verify(adminService, times(1)).findAllAdmins();
    }

    @Test
    void getAdminById() {
        String adminId = "123";
        Admin expectedAdmin = new Admin();
        when(adminService.getAdminById(adminId)).thenReturn(expectedAdmin);

        Admin result = adminController.getAdminById(adminId);

        assertEquals(expectedAdmin, result);
        verify(adminService, times(1)).getAdminById(adminId);
    }

    @Test
    void getAdminId_ReturnsOkResponse() {
        String adminId = "123";
        Admin admin = new Admin();
        admin.setEmail("test@example.com");
        admin.setPassword("password");

        when(adminService.getAdminByLoginDatas(admin.getEmail(), admin.getPassword())).thenReturn(admin);

        ResponseEntity<?> response = adminController.getAdminId(admin);

        assertEquals(ResponseEntity.ok(admin.getAdminId()), response);
        verify(adminService, times(1)).getAdminByLoginDatas(admin.getEmail(), admin.getPassword());
    }

    @Test
    void getAdminId_InvalidCredentials_ReturnUnauthorizedResponse() {
        Admin admin = new Admin();
        admin.setEmail("test@example.com");
        admin.setPassword("password");

        when(adminService.getAdminByLoginDatas(admin.getEmail(), admin.getPassword())).thenReturn(null);

        ResponseEntity<?> response = adminController.getAdminId(admin);

        assertEquals(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("\n" + "Invalid login details or admin does not exist"), response);
        verify(adminService, times(1)).getAdminByLoginDatas(admin.getEmail(), admin.getPassword());
    }

    @Test
    void createAdmin_ReturnOkResponse() {
        Admin admin = new Admin();
        admin.setEmail("example@email.com");
        admin.setPassword("password");

        when(adminService.existsByEmail(anyString())).thenReturn(false);
        when(adminService.addAdmin(admin)).thenReturn(admin);

        ResponseEntity<?> response = adminController.createAdmin(admin);

        assertEquals(ResponseEntity.ok(admin.getAdminId()), response);
        verify(adminService, times(1)).existsByEmail(anyString());
        verify(adminService, times(1)).addAdmin(admin);
    }

    @Test
    void createAdmin_AdminWithEmailExists_ReturnBadRequestResponse() {
        Admin admin = new Admin();
        admin.setEmail("test@example.comn");

        when(adminService.existsByEmail(anyString())).thenReturn(true);

        ResponseEntity<?> response = adminController.createAdmin(admin);

        assertEquals(ResponseEntity.badRequest().body("Email already exists"), response);
        verify(adminService, times(1)).existsByEmail(anyString());
        verify(adminService, never()).addAdmin(any());
    }

    @Test
    void modifyAdmin() {
        Admin admin = new Admin();
        Admin updatedAdmin = new Admin();
        when(adminService.updateAdmin(admin)).thenReturn(updatedAdmin);

        Admin result = adminController.modifyAdmin(admin);

        assertEquals(updatedAdmin, result);
        verify(adminService, times(1)).updateAdmin(admin);
    }

    @Test
    void deleteAdmin() {
        String adminId = "123";
        when(adminService.deleteAdmin(adminId)).thenReturn("Deleted");

        String result = adminController.deleteAdmin(adminId);

        assertEquals("Deleted", result);
        verify(adminService, times(1)).deleteAdmin(adminId);
    }
}
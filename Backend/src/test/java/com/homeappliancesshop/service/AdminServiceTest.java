package com.homeappliancesshop.service;

import com.homeappliancesshop.model.Admin;
import com.homeappliancesshop.repository.AdminRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AdminServiceTest {
    @InjectMocks
    private AdminService adminService;

    @Mock
    private AdminRepository repository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @AfterEach
    void clear() { reset(repository); }

    @Test
    void findAllAdmins() {
        List<Admin> admins = new ArrayList<>();
        admins.add(new Admin());
        admins.add(new Admin());

        when(repository.findAll()).thenReturn(admins);

        List<Admin> result = adminService.findAllAdmins();

        assertEquals(admins.size(), result.size());
        verify(repository, times(1)).findAll();
    }

    @Test
    void getAdminById() {
        String adminId = "123";
        Admin admin = new Admin();
        admin.setAdminId(adminId);

        when(repository.findById(adminId)).thenReturn(Optional.of(admin));

        Admin result = adminService.getAdminById(adminId);

        assertEquals(adminId, result.getAdminId());
        verify(repository, times(1)).findById(adminId);
    }

    @Test
    void addAdmin() {
        Admin admin = new Admin();
        admin.setEmail("email@gmail.com");
        admin.setPassword("Password123!");

        when(repository.save(admin)).thenReturn(admin);

        Admin result = adminService.addAdmin(admin);

        assertEquals(admin, result);
        verify(repository, times(1)).save(admin);
    }

    @Test
    void updateAdmin() {
        String adminId = "123";
        Admin existingAdmin = new Admin();
        existingAdmin.setAdminId(adminId);
        existingAdmin.setEmail("existing@admin.com");
        existingAdmin.setPassword("password");

        Admin updatedAdmin = new Admin();
        updatedAdmin.setAdminId(adminId);
        updatedAdmin.setEmail("updated@admin.com");
        updatedAdmin.setPassword("newpassword");

        when(repository.findById(adminId)).thenReturn(Optional.of(existingAdmin));
        when(repository.save(existingAdmin)).thenReturn(updatedAdmin);

        Admin result = adminService.updateAdmin(updatedAdmin);

        assertEquals(updatedAdmin.getEmail(), result.getEmail());
        assertEquals(updatedAdmin.getPassword(), result.getPassword());
        verify(repository, times(1)).findById(adminId);
        verify(repository, times(1)).save(existingAdmin);
    }

    @Test
    void deleteAdmin() {
        String adminId = "123";
        Admin admin = new Admin();
        admin.setAdminId(adminId);
        admin.setEmail("email@test.com");
        admin.setPassword("password93");

        String result = adminService.deleteAdmin(adminId);

        assertEquals(adminId + "admin deleted from database", result);
        verify(repository, times(1)).deleteById(adminId);
    }

    @Test
    void existsByEmail_WhenEmailExists() {
        String email = "admin@admin.com";
        Admin admin = new Admin();
        admin.setEmail(email);

        when(repository.findByEmail(email)).thenReturn(admin);

        boolean result = adminService.existsByEmail(email);

        assertTrue(result);
        verify(repository, times(1)).findByEmail(email);
    }

    @Test
    void existsByEmail_WhenEmailDoesNotExist() {
        String email = "admin@admin.com";

        when(repository.findByEmail(email)).thenReturn(null);

        boolean result = adminService.existsByEmail(email);

        assertFalse(result);
        verify(repository, times(1)).findByEmail(email);
    }

    @Test
    void getAdminByLoginDatas_WhenAdminExists() {
        String email = "admin@admin.com";
        String password = "password";
        Admin admin = new Admin();
        admin.setEmail(email);
        admin.setPassword(password);

        when(repository.findByEmail(email)).thenReturn(admin);

        Admin result = adminService.getAdminByLoginDatas(email, password);

        assertEquals(admin, result);
        verify(repository, times(2)).findByEmail(email);
    }

    @Test
    void getAdminByLoginDatas_WhenAdminDoesNotExists() {
        String email = "admin@admin.com";
        String password = "password";

        when(repository.findByEmail(email)).thenReturn(null);

        Admin result = adminService.getAdminByLoginDatas(email, password);

        assertNull(result);
        verify(repository, times(1)).findByEmail(email);
    }
}
package com.homeappliancesshop.service;

import com.homeappliancesshop.model.Admin;
import com.homeappliancesshop.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {
    @Autowired
    private AdminRepository repository;

    public List<Admin> findAllAdmins() {
        return repository.findAll();
    }

    public Admin getAdminById(String adminId) {
        return repository.findById(adminId).get();
    }

    public Admin addAdmin(Admin admin) {
        return repository.save(admin);
    }

    public Admin updateAdmin(Admin adminRequest) {
        Admin existingAdmin = repository.findById(adminRequest.getAdminId()).get();
        existingAdmin.setEmail(adminRequest.getEmail());
        existingAdmin.setPassword(adminRequest.getPassword());
        return repository.save(existingAdmin);
    }

    public String deleteAdmin(String adminId) {
        repository.deleteById(adminId);
        return adminId + "admin deleted from database";
    }

    public boolean existsByEmail(String email) {
        return repository.findByEmail(email) != null;
    }

    public Admin getAdminByLoginDatas(String email, String password) {
        if(repository.findByEmail(email) != null){
            Admin admin = repository.findByEmail(email);
            if (admin.getPassword().equals(password)) {
                return admin;
            }
            return null;
        }
        return null;
    }
}

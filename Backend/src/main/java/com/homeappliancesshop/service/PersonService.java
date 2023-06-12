package com.homeappliancesshop.service;

import com.homeappliancesshop.model.Person;
import com.homeappliancesshop.model.Transaction;
import com.homeappliancesshop.model.TransactionsHistory;
import com.homeappliancesshop.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PersonService {

    @Autowired
    private PersonRepository repository;

    @Autowired
    private AddressService addressService;

    @Autowired
    private TransactionsHistoryService transactionsHistoryService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public List<Person> findAllPersons() {
        return repository.findAll();
    }

    public Person getPersonById(String personId) {
        return repository.findById(personId).get();
    }

    public Person addPerson(Person person) {
        addressService.addAddress(person.getAddress());
        TransactionsHistory transactionsHistory = transactionsHistoryService.addTransactionsHistory(new TransactionsHistory());
        person.setTransactionsHistory(transactionsHistory);

        ArrayList<String> roles = new ArrayList<>();
        roles.add("ROLE_USER");
        person.setRoles(roles);

        String encryptedPassword = bCryptPasswordEncoder.encode(person.getPassword());
        person.setPassword(encryptedPassword);

        return repository.save(person);
    }

    public Person updatePerson(Person personRequest) {
        Person existingPerson = repository.findById(personRequest.getPersonId()).get();
        existingPerson.setName(personRequest.getName());
        existingPerson.setSurname(personRequest.getSurname());
        existingPerson.setEmail(personRequest.getEmail());
        existingPerson.setPassword(personRequest.getPassword());
        existingPerson.setPhoneNumber(personRequest.getPhoneNumber());
        return repository.save(existingPerson);
    }

    public String deletePerson(String personId) {
        repository.deleteById(personId);
        return personId + "person deleted from database";
    }

    public TransactionsHistory addTransaction(String personId, Transaction transaction) {
        Optional<Person> person = repository.findById(personId);

        if(person.isEmpty()){
            return null;
        }

        return transactionsHistoryService.addTransaction(
                person.get().getTransactionsHistory().getTransactionId(), transaction);
    }

    public boolean existsByEmail(String email) {
        return repository.findByEmail(email) != null;
    }

    public Person getPersonByLoginDatas(String email, String password) {
        if(repository.findByEmail(email) != null){
            Person person = repository.findByEmail(email);


            //if (person.getPassword().equals(password)) {
            if(bCryptPasswordEncoder.matches(password, person.getPassword())){
                return person;
            }
            return null;
        }
        return null;
    }

    public Person getAdminByLoginDatas(String email, String password) {
        if(repository.findByEmail(email) != null){
            Person admin = repository.findByEmail(email);

            if(bCryptPasswordEncoder.matches(password, admin.getPassword())){
                return admin;
            }
            return null;
        }
        return null;
    }

}

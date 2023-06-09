package com.homeappliancesshop.service;

import com.homeappliancesshop.model.Address;
import com.homeappliancesshop.repository.AddressRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import org.mockito.MockitoAnnotations;

class AddressServiceTest {
    @Mock
    private AddressRepository repository;

    @InjectMocks
    private AddressService service;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @AfterEach
    void clear() { reset(repository); }

    @Test
    void addAddress() {
        Address address = new Address();
        address.setState("State");
        address.setPostCode("12-345");
        address.setCity("City");
        address.setApartment("1A");
        address.setStreet("Street");

        when(repository.save(any(Address.class))).thenReturn(address);

        Address result = service.addAddress(address);

        verify(repository, times(1)).save(address);
        assertEquals(address, result);
    }
}

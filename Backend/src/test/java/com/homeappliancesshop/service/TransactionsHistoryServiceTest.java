package com.homeappliancesshop.service;

import com.homeappliancesshop.model.Transaction;
import com.homeappliancesshop.model.TransactionsHistory;
import com.homeappliancesshop.repository.TransactionsHistoryRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TransactionsHistoryServiceTest {
    @InjectMocks
    private TransactionsHistoryService transactionsHistoryService;

    @Mock
    private TransactionsHistoryRepository transactionsHistoryRepository;

    @Mock
    private TransactionsService transactionsService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @AfterEach
    void clear() { reset(transactionsHistoryRepository); }

    @Test
    void addTransaction() {
        String transactionHistoryId = "123";
        Transaction transaction = new Transaction();

        TransactionsHistory transactionsHistory = new TransactionsHistory();
        transactionsHistory.setTransactionId(transactionHistoryId);
        transactionsHistory.setTransactions(new ArrayList<>());

        when(transactionsHistoryRepository.findById(transactionHistoryId)).thenReturn(Optional.of(transactionsHistory));
        when(transactionsHistoryRepository.save(transactionsHistory)).thenReturn(transactionsHistory);

        TransactionsHistoryService transactionsHistoryService = new TransactionsHistoryService(transactionsHistoryRepository, transactionsService);
        TransactionsHistory result = transactionsHistoryService.addTransaction(transactionHistoryId, transaction);

        verify(transactionsHistoryRepository, times(1)).findById(transactionHistoryId);
        verify(transactionsHistoryRepository, times(1)).save(transactionsHistory);
        assertEquals(transactionsHistory, result);
        assertEquals(1, transactionsHistory.getTransactions().size());
        assertEquals(transaction, transactionsHistory.getTransactions());
    }


    @Test
    void addTransactionsHistory() {
        TransactionsHistory transactionsHistory = new TransactionsHistory();

        when(transactionsHistoryRepository.save(transactionsHistory)).thenReturn(transactionsHistory);

        TransactionsHistory result = transactionsHistoryService.addTransactionsHistory(transactionsHistory);

        verify(transactionsHistoryRepository, times(1)).save(transactionsHistory);
        assertEquals(transactionsHistory, result);
    }
}
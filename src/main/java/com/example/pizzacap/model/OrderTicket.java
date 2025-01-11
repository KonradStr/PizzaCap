package com.example.pizzacap.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderTicket {
    private int order_id;
    private LocalDateTime order_date;

    /* Do panelu z zamówieniami:
    Nowe - Niebieski (#007bff)
    W trakcie realizacji - Pomarańczowy (#ff9900)
    Gotowe do wysyłki - Zielony (#28a745)
    W drodze - Żółty (#ffc907)
    Zakończone - Szary (#6c757d)
    */
    private String status;
    private String additional_note;
    private List<OrderTicketPosition> orderItemPositionList;

}

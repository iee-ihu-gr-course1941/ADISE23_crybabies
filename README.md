Table of Contents
=================
   * [Εγκατάσταση](#εγκατάσταση)
      * [Απαιτήσεις](#απαιτήσεις)
      * [Οδηγίες Εγκατάστασης](#οδηγίες-εγκατάστασης)
   * [Περιγραφή API](#περιγραφή-api)
      * [Methods](#methods)
         * [Board](#board)
            * [Ανάγνωση Board](#ανάγνωση-board)
         * [Pawn](#piece)
            * [Ανάγνωση Θέσης Πιονιών](#ανάγνωση-θέσηςπιονιού)
            * [Μεταβολή Θέσης Πιονιού](#μεταβολή-θέσης-πιονιού)
            * [Ανάγνωση Πιονιοών Παίκτη ](#μεταβολή-θέσης-πιονιού)
            * [Ανάγνωση Βημάτων Πιονιού ](#μεταβολή-θέσης-πιονιού)
         * [Player](#player)
            * [Ανάγνωση στοιχείων παίκτη](#ανάγνωση-στοιχείων-παίκτη)
            //exoume kan tetoio?
            * [Καθορισμός στοιχείων παίκτη](#καθορισμός-στοιχείων-παίκτη)
         * [Status](#status)
            * [Ανάγνωση κατάστασης παιχνιδιού](#ανάγνωση-κατάστασης-παιχνιδιού)
            
      * [Entities](#entities)
         * [Board](#board-1)
         * [Players](#players)
         * [Game_status](#game_status)

# Demo Page

Μπορείτε να κατεβάσετε τοπικά ή να επισκευτείτε την σελίδα: 
https://users.iee.ihu.gr/~asidirop/adise21/Lectures21-chess/

# Εγκατάσταση

## Απαιτήσεις

* Apache2
* Mysql Server
* php

## Οδηγίες Εγκατάστασης

 * Κάντε clone το project σε κάποιον φάκελο <br/>
  `$ git clone https://github.com/iee-ihu-gr-course1941/ADISE23_crybabies.git`

 * Βεβαιωθείτε ότι ο φάκελος είναι προσβάσιμος από τον Apache Server. πιθανόν να χρειαστεί να καθορίσετε τις παρακάτω ρυθμίσεις.

 * Θα πρέπει να δημιουργήσετε στην Mysql την βάση με όνομα 'adise21' και να φορτώσετε σε αυτήν την βάση τα δεδομένα από το αρχείο schema.sql

 * Θα πρέπει να φτιάξετε το αρχείο lib/config_local.php το οποίο να περιέχει:
```
    <?php
	$DB_PASS = 'κωδικός';
	$DB_USER = 'όνομα χρήστη';
    ?>
```

# Περιγραφή Παιχνιδιού

Το σκάκι παίζεται ως εξής: .....

Οι κανόνες είναι οι 
Εισήγαγε ένα όνομα χρήστη και επέλεξε το πρώτο διαθέσιμο χρώμα παίκτη από τις επιλογές! Αν το χρώμα που επέλεξες χρησιμοποιείται από άλλο παίκτη, επέλεξε το αμέσως επόμενο! 
-Πάτα το κουμπί ΕΙΣΟΔΟΣ ΣΤΟ ΠΑΙΧΝΙΔΙ για να ξεκινήσει το παιχνίδι!
-Όταν έρθει η σειρά σου, ρίξε το ζάρι συνεχόμενα μέχρι να τύχεις 6! Τότε μπορείς να κουνήσεις ένα από τα πιόνια σου και ξεκινήσεις να παίζεις!
-Κάθε φορά που πετυχαίνεις 6 μπορείς να ξαναπαίξεις! 
-Για εγκατάλειψη του παιχνιδιού πάτα το κουμπί Νέο Παιχνίδι! Αυτό θα σου επιτρέψει να συνδεθείς εκ νέου σε ένα παιχνίδι και θα ενημερώσει τους αντιπάλους σου, για την αποχώρησή σου, τερματίζοντας το παιχνίδι.
-Ο νικητής του παιχνιδιού πρέπει να φέρει και τα 4 πιόνια του στο αντίστοιχο τερματικό κελί! 

Η εφαρμογή απαπτύχθηκε μέχρι το σημείο .....(αναφέρετε τι υλοποιήσατε και τι όχι)
  
## Βάση Παιχνιδιού:

- **Πίνακες:**
  
  - board:
      - x
      - y
      - b_color
      - b_fun
  - pawns:
      - p_color
      - p_num
      - x
      - y
      - sum
  - pawns_empty:
      - p_color
      - p_num
      - x
      - y
      - sum
  - players:
      - username
      - p_color
      - token
      - last_action
   - game_status:
      - status
      - p_turn
      - last_change
  
- **Διαδικασίες:**

  - clean_pawns
  - check_status
  - move_piece
  - new_game


## Συντελεστές

Περιγράψτε τις αρμοδιότητες της ομάδας.

Προγραμματιστής 1: Jquery

- Βαλέριο Κιόσε 2019070 <br/>
- Ελένη Δαυιτίδου 2019030 <br/>

# Περιγραφή API

## Methods

### Board

#### Ανάγνωση Board
```
GET /board/
```

Επιστρέφει το [Board](#board-1).

### Pawns

#### Ανάγνωση Pawns
```
GET /pawns/
```

Επιστρέφει το [Pawns](#board-1).

#### Ενημέρωση θέσης πιονιού
```
PUT board/piece/:x/:y/:p_num/:sql_steps/:token/

Json Data:

| Field             | Description                               | Required   |
| ----------------- | ----------------------------------------- | ---------- |
| `x`               | Η θέση χ στον πίνακα Board                | yes        |
| `y`               | Η θέση y στον πίνακα Board                | yes  	     |
| `p_num`           | Ο αριθμός πιονιού που μετακινείτε         | yes  	     |
| `sql_steps`       | Τα συνολικά βήματα που έχει διανύσει      | yes  	     |
| `token`           | Το session token του παίκτη               | yes  	     |


```
#### Ανάγνωση πιονιών παίκτη

```
GET /p_pieces/:p_color/

```

#### Ανάγνωση βημάτων πιονιού

```
GET /psum/:color/:p_num/
```

### Player

#### Καθορισμός στοιχείων παίκτη

```
PUT /players/:p_color/
```

Json Data:

| Field             | Description                               | Required   |
| ----------------- | ----------------------------------------- | ---------- |
| `username'        | Το χρώμα του παίκτη                       | yes        |
| `p_color'         | Το χρώμα του παίκτη                       | yes        |

### Status

#### Ανάγνωση κατάστασης παιχνιδιού

```
GET /status/
```

## Entities
### Board
### Players
### Game_status
### Pawns
### yara yara

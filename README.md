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

- **Χαρακτηριστικά παιχνιδιού:**
   Ο Γκρινιάρης είναι ένα επιτραπέζιο παιχνίδι στο οποίο μπορούν να συμμετέχουν 2 έως 4 παίκτες. Η εναλλαγή μεταξύ των παικτών ακολουθεί την φορά του ρολογιού για τους διαθέσιμους παίκτες, ενώ για την κίνηση των πιονιών τους χρησιμοποιείται ένα ζάρι. Κάθε παίκτης έχοντας επιλέξει ένα από τα 4 χρώματα πιονιών, ρίχνει το ζάρι με στόχο να πετύχει τον αριθμό 6 και έτσι να εισαχθεί στο παιχνίδι. Τυχαίνοντας 6, ο παίκτης εξάγει ένα από τα πιόνια του στην αφετηρία του και ξαναρίχνει το ζάρι για να το μετακινήσει πάνω στον πίνακα. Κάθε παίκτης περιμένει την σειρά του για να ρίξει το ζάρι και μετακινήσει ένα από τα πιόνια του πάνω στον πίνακα. Ένας παίκτης έχει το δικαίωμα να απενεργοποιήσει το πίονι ενός αντιπάλου όταν βρεθούν τα δυο πιόνια στο ίδιο κελί. Υπάρχουν όμως και κελιά, με ειδική σήμανση, που δεν επιτρέπουν αυτή την απενεργοποίηση και αντιθέτως φιλοξενούν τα δύο αντίπαλα πιόνια στο ίδιο κελί. Κάθε φορά που ένας παίκτης τυχαίνει 6 ή "τρώει" ένα από τα αντίπαλα πιόνια, ξαναρίχνει το ζάρι και ξαναπαίζει. Όταν ένα αντίπαλο πιόνι "φάει" ένα από τα πιόνια του παίκτη, τότε αυτό θα τοποθετηθεί στην αρχική εσωτερική θέση των πιονιών του και θα μπορεί να χρησιμοποιηθεί από τον παίκτη μόνο τυχαίνοντας 6. Στόχος κάθε παίκτη είναι να κάνει τον γύρο του πίνακα για κάθε ένα από τα 4 πίονια του και να τα τοποθετήσει στο κέντρο του πίνακα. Ο πρώτος που θα το καταφέρει, αποφεύγοντας τις επιθέσεις των αντιπάλων, κερδίζει το παιχνίδι. Το παιχνίδι συνεχίζεται για τους υπόλοιπους παίκτες, αν υπάρχουν, αναδεικνύοντας δεύτερο και τρίτο νικητή αντιστοίχως. 

- **Κανόνες παιχνιδιού:**  
   - Για να εισαχθεί ένα πιόνι στο παιχνίδι πρέπει ο παίκτης να τύχει 6
   - Κάθε φορά που τυχαίνει 6 και εκτελεί μια κίνηση, ο παίκτης ξαναρίχνει το ζάρι
   - Η σειρά του παιχνίδιου ακολουθεί την φορά του ρολογιού
   - Σε περίπτωση τοποθέτησης δύο πιονιών στο ίδιο κελί υπάρχουν δύο επιδράσεις:
      - αν τα δύο πιόνια είναι του ίδιου χρώματος, τότε παραμένουν στο ίδιο κελί δημιουργώντας ένα επιπλέον "ασφαλές" κελί (σαν block), παρόμοιο με αυτά με την ειδική σήμανση 
      - αν τα δύο πιόνια είναι διαφορετικού χρώματος, τότε το πιόνι που υπήρχε στο κελί απενεργοποιείται και το κελί περιέχει μόνο το προσφάτως εισερχόμενο πιόνι (που απενεργοποίησε το άλλο)
   - Κάθε φορά που ένας παίκτης απενεργοποιεί ένα αντίπαλο πιόνι, ξαναπαίζει
   - Τα πιόνια είναι "ασφαλή" και δεν μπορούν να απενεργοποιηθούν στα κελιά αφετηριών, στα κελιά με αστεράκι, στις εσωτερικές θέσεις του αντίστιχου χρώματος που οδηγούν στο κέντρο του πίνακα και στα blocks που αναφέρθηκαν προηγουμένως
   - Με την αποχώρηση ενός παίκτη, το παιχνίδι συνεχίζεται κανονικά για τους υπόλοιπους παίκτες
   - Νικητής του παιχνιδιού είναι ο παίκτης που θα φέρει πρώτος στο κέντρο του πίνακα και τα 4 πιόνια του 

- **Πληροφορίες υλοποίησης:** 
   Η εφαρμογή απαπτύχθηκε μέχρι το σημείο ένδειξης του πρώτου νικητή, η οποία τερματίζει το παιχνίδι. Δεν υλοποιήθηκε η επέκταση του παιχνιδιού για την ένδειξη δεύτερου και τρίτου παίκτη. Η εφαρμογή επιτρέπει την συμμετοχή 2 και 4 παικτών επιλέγοντας συγκεκριμένα χρώματα πιονιών. Πιο αναλυτικά, κάθε παίκτης πρέπει να διαλέγει το πρώτο διαθέσιμο στη σειρά των επιλογών χρώμα πιονιών για να λειτουργήσει σωστά το παιχνίδι. Έτσι, ένας νέος χρήστης πρέπει να επιλέξει αρχικά το κόκκινο χρώμα. Αν αυτό δεν ειναι πλέον διαθέσιμο ως επιλογή, ο χρήστης ενημερώνεται με την κατάλληλη ειδοποίηση για να επιλέξει το επόμενο στη σειρά χρώμα, δηλαδή το μπλε κοκ. Το παιχνίδι ακολουθεί πλήθος των παραπάνω κανόνων, ενώ οι παίκτες πραγματοποιούν τις αντίστοιχες κινήσεις πάνω στον πίνακα και ενημερώνονται όπου είναι απαραίτητο είτε με μηνύματα ειδοποίησης, είτε από το information icon στα αριστερά του παραθύρου. Έχει γίνει πλήρης υλοποίηση των βασικών αρχών του παιχνιδιού, όπως είναι η απενεργοποίηση πιονιών, η ύπαρξη "ασφαλών" κελιών και η δημιουργία νέων σε περιπτώσεις ύπαρξης 2 πιονιών του ίδιου χρώματος. Επίσης υλοποιήθηκε ο καθορισμός της σωστής σειράς των παικτών με βάση τις ανάγκες του παιχνιδιού, όπως και η αρχικοποίηση σύνδεσης των παικτών χωρίς password. Το παιχνίδι αρχικοποιείται με την είσοδο του πρώτου παίκτη, ενώ μπορεί να ξεκινήσει μόνο με την είσοδο ενός ή περισσοτέτων αντιπάλων. Το παιχνίδι τερματίζεται σε περίπτωση που ένας παίκτης αποχωρήσει με οποιονδήποτε τρόπο (έναρξη νέου παιχνιδιού ή κλείσιμο παραθύρου), αλλά και με την ένδειξη του πρώτου νικητή. 
  
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
  - move_piece
  - new_game


## Συντελεστές

- Βαλέριο Κιόσε 2019070 <br/>
- Ελένη Δαυιτίδου 2019034 <br/>

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

Επιστρέφει το [Pawns](#pawns-1).

#### Ενημέρωση θέσης πιονιού
```
PUT board/piece/:x/:y/:p_num/:sql_steps/:token/
```

Json Data:

| Field             | Description                               | Required   |
| ----------------- | ----------------------------------------- | ---------- |
| `x`               | Η θέση χ στον πίνακα Board                | yes        |
| `y`               | Η θέση y στον πίνακα Board                | yes  	     |
| `p_num`           | Ο αριθμός πιονιού που μετακινείτε         | yes  	     |
| `sql_steps`       | Τα συνολικά βήματα που έχει διανύσει      | yes  	     |
| `token`           | Το session token του παίκτη               | yes  	     |

Επιστρέφει το [Pawns](#pawns-1).

```
#### Ανάγνωση πιονιών παίκτη
```
GET /p_pieces/:p_color/

```

Επιστρέφει ολα τα πιόνια με χρώμα p_color απο το [Pawns](#pawns-1).

#### Ανάγνωση βημάτων πιονιού

```
GET /psum/:color/:p_num/
```

Επιστρέφει απο το [Pawns](#pawns-1) τα συνολικά βήματα που έχει διανύσει ενα πιόνι.

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

Επιστρέφει τα στοιχεία του παίκτη p_color και ένα token. Το token πρέπει να το χρησιμοποιεί ο παίκτης καθόλη τη διάρκεια του παιχνιδιού.

### Status

#### Ανάγνωση κατάστασης παιχνιδιού

```
GET /status/
```

Επιστρέφει τα στοιχεία του παίκτη p και ένα token. Το token πρέπει να το χρησιμοποιεί ο παίκτης καθόλη τη διάρκεια του παιχνιδιού.

## Entities

### Board
Το board είναι ένας πίνακας, ο οποίος στο κάθε στοιχείο έχει τα παρακάτω:


| Attribute                | Description                                  | Values                              |
| ------------------------ | -------------------------------------------- | ----------------------------------- |
| `x`                      | H συντεταγμένη x του τετραγώνου              | 1..11                                |
| `y`                      | H συντεταγμένη y του τετραγώνου              | 1..11                                |
| `b_color`                | To χρώμα του τετραγώνου                      | 'B','R','Y','G','S_G','S_B','S_Y','S_R','RGBY'|
| `b_fun`                  | Η λειτουργία του τετραγώνου                  | 'W','B_sleep','Y_sleep','G_sleep','R_sleep','S','G_finals','R_finals','B_finals','Y_finals','G_start','B_start','R_start','Y_start','B_end','G_end','R_end','Y_end',|

### Players
O κάθε παίκτης έχει τα παρακάτω στοιχεία:

| Attribute                | Description                                  | Values                              |
| ------------------------ | -------------------------------------------- | ----------------------------------- |
| `username`               | Όνομα παίκτη                                 | String                              |
| `piece_color`            | To χρώμα που παίζει ο παίκτης                | 'B','R','G','Y'                     |
| `token  `                | To κρυφό token του παίκτη. Επιστρέφεται μόνο τη στιγμή της εισόδου του παίκτη στο παιχνίδι | HEX |

### Game_status
H κατάσταση παιχνιδιού έχει τα παρακάτω στοιχεία:

| Attribute                | Description                                  | Values                              |
| ------------------------ | -------------------------------------------- | ----------------------------------- |
| `status  `               | Κατάσταση                                    | 'not active', 'initialized', 'started', 'ended', 'aborded'|
| `p_turn`                 | To χρώμα του παίκτη που παίζει               | 'R','Y','B','G',null|
| `result`                 |  To χρώμα του παίκτη που κέρδισε |'B','W',null                                     |
| `last_change`            | Τελευταία αλλαγή/ενέργεια στην κατάσταση του παιχνιδιού| timestamp                 |

### Pawns
Το κάθε πιόνι έχει τα παρακάτω στοιχεία:

| Attribute                | Description                                  | Values                              |
| ------------------------ | -------------------------------------------- | ----------------------------------- |
| `p_color`                | To χρώμα του πιονιού                         | 'R','Y','B','G'                     |
| `p_num`                  | Ο αριθμός του πιονιού                        | '1','2','3','4'                     |
| `x`                      | H συντεταγμένη x του τετραγώνου              | 1..11                               |
| `y`                      | H συντεταγμένη y του τετραγώνου              | 1..11                               |
| `sum`                    | Το σύνολο βημάτων που έχει διανύσει το πιόνι | 1..255                              |

### yara yara

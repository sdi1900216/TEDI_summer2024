
export default function validateSignup( values) {

    let error= {}
    // περιγράφει την μορφή που είναι έγκυρο το email, δηλα΄δή [κάτι]@[κάτι].[κάτι] πχ. sdi1900216@di.uoa.gr, 
    // ενώ οκωδικός πρέπει να έχει τουλάχιστον 8 στοιχεία, με συνδιασμό γραμμάτων a-z (ή κεφαλαίων) και αριθμού 

    const email_pattern= /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
    const password_pattern= /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/  

    if(!email_pattern.test(values.email)) {
        error.email= "Email didn't match."
    }
    
    if(!password_pattern.test(values.password)) {
        error.password= "Password didn't match."
    }
    return error;
}
# Binder  
  
A light-weight data binding library  
  
Usage:  
        Create a bindable and bind it to another bindable or a jquery field.  
        bindable: a variable with a getter and setter than can be bound to and from other bindables and fields.  
        combind: a combined bindable, it can get its value from other bindables and be dynamically updated.  
  
Issues:  
        Currently only supports updating fields with jquery's .val() function.  
  
Commands:  
        binder.bindable() //returns a new bindable  
                .get() //gets the current value of the bindable  
                .set(value); //sets the current value of the bindable and updates all bound objects  
                .bind(target); //binds the target to the current bindable. The target will be updated whenever the current bindable is updated  
                  
        binder.combind(ArrayOfBindableDependencies, function) //returns a combined bindable based on input parameters  
                .get() //gets the current value of the combind  
                .bind(target); //binds the target to the current combind. The target will be updated whenever the current combind is updated  
                  
        binder.bind(source, target);  
  
Usage examples:  
        //binding one bindable to another  
        var value1 = binder.bindable();  
        var value2 = binder.bindable();  
        value1.bind(value2);  
        value1.set("test");  
        value2.get(); //Should return "test" since it was updated by value1.  
        
        //different way to do the above (a bit more intuitive)  
        //binding one bindable to another  
        var value1 = binder.bindable();  
        var value2 = binder.bindable();  
        binder.bind(value1, value2);  
        value1.set("test");  
        value2.get(); //Should return "test" since it was updated by value1.  
        
        //create a combind that displays a full name based on a first and last name  
        var firstName = binder.bindable();  
        firstName.set("First");  
        var lastName = binder.bindable();  
        lastName.set("Last");  
        var fullName = binder.combind([firstName, lastName], function() { return firstName.get() + " " + lastName.get() });  
        fullName.get(); //Should return "First Last"  
          
        //expanding upon the previous example, this will bind the fields to textboxes with specific IDs  
        //it binds 2 textboxes with the IDs "firstName" and "lastName" to bindables then binds a combind (based on the aforementioned bindables) and binds a third textbox to the combind.  
        firstName = binder.bindable("");  
        lastName = binder.bindable("");  
        fullName = binder.combind([firstName, lastName], function () { return firstName.get() + " " + lastName.get() });  
        binder.bind("#firstName", firstName);  
        binder.bind("#lastName", lastName);  
        binder.bind(fullName, "#fullName");  

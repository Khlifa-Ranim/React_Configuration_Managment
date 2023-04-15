export default function validation (name,description){
    const errors ={}
  
    const name_pattern= /^[a-zA-Z\s]*$/;
    const description_pattern= /^[a-zA-Z\s]*$/;
  
    if(name.trim()===""){
        errors.name="Name is Required"
    }
    else if (!name_pattern.test(name)){
        errors.name="Name should only contain letters and spaces"
     }
    
    if(description.trim()===""){
        errors.description="Description is Required" 
    }
    else if (!description_pattern.test(description)){
        errors.description="Description should only contain letters and spaces"
     }
     
     return errors;
  }
  
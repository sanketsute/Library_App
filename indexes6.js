//constructor
print();
function Book(name,author,type){
    this.name=name;
    this.author=author;
    this.type=type;
}
function  print(){
    
    let notes=localStorage.getItem("notes");
    let text="";
    if(notes!==null){
    let notesobj=JSON.parse(notes);
    notesobj.forEach((element,index) => {
        text+=`<tr>

<td>${element.name}</td>
<td>${element.author}</td>
<td>${element.type}</td>
<td ><button id="${index}" onClick=deletenotes(${index}) class="btn btn-outline-dark">X</button></td>
</tr>`;
        
    }
    );
    document.getElementById("tableBody").innerHTML=text;
    

}
}

//class
class Display{
    add(book){
    
    
        let notes=localStorage.getItem("notes");
        if(notes==null){
            let notesobj=[];
            notesobj.push(book);
            
            localStorage.setItem("notes",JSON.stringify(notesobj));
            
    
    
        }else{
            let notesobj=JSON.parse(notes);
            notesobj.push(book);
            localStorage.setItem("notes",JSON.stringify(notesobj));
    
        }
    print();}
       
        clear(){
            let libraryForm =document.getElementById("libraryForm");
            libraryForm.reset();
        
        
        }
        validate(book){
            if(book.name.length<2||book.author.length<2){
                return false;
            } else{
                return true;
            }
        
        
        }
        show(type,item){
    
            let text=
            `<div class="alert alert-${type} alert-dismissible fade show"  role="alert">
                   ${item}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>`;
                  document.getElementById("message").innerHTML=text;
                  setTimeout(function(){
                    document.getElementById("message").innerHTML="";
                  },2000)
                  
        }

}



//add event listener in submit form
let libraryForm =document.getElementById("libraryForm");
libraryForm.addEventListener("submit",function(e){
e.preventDefault();


let name=document.getElementById("bookName").value;
let author =document.getElementById("author").value;


let type;
let fiction =document.getElementById("fiction");
let programing =document.getElementById("programing");
let cooking =document.getElementById("cooking");


if(fiction.checked){
    type=fiction.value;
}
else if(programing.checked){
    type=programing.value;
}
else if(cooking.checked)
    {type=cooking.value;}


    let book = new Book(name,author,type);

let display=new Display();
let notes=localStorage.notes;


if(display.validate(book)){
 display.add(book);
display.clear();
print();
display.show("primary","<strong>Sucesss!</strong> Successfully added") ;  
}

else {
display.show("warning","<strong>Error!</strong> Warning Name and Author should have atleast 2 character");
}


})
function deletenotes(i){
    
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesobj="";
        localStorage.setItem("notes",JSON.stringify(notesobj));
    print();
    }else{
    let notesobj=JSON.parse(notes);
    console.log(notesobj);
    notesobj.splice(i,1);
    console.log(i);
    localStorage.setItem("notes",JSON.stringify(notesobj));
   print();
}
   
    


}
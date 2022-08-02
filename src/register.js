import React, { useState,useEffect } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { app, database, storage } from '../src/FirebasConfig/firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot,query,where } from "firebase/firestore"; // adding/getting/updating/deleting  data in firestore
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";






const Register = () => {

    const [data, setData] = useState({});
    const [fdata, setFdata] = useState([]);

    const collectionRef = collection(database, 'users');
    // database name firebase as user->

  
    const ageQuery = query(collectionRef, where("age",">",20));
    //check age is number or string in firebase 
    const nameQuery =query(collectionRef,where("email","==","sourav@ehya.com"));


    const handleInput = (event) => {
        let userInput = { [event.target.name]: event.target.value };

        setData({ ...data, ...userInput });
    }


    const auth = getAuth();



    const handleSubmit7 = (e) => {
        e.preventDefault();

        //sending data using addDoc fun, {addDoc accpet two param , "collection" and other param "data"}

        addDoc(collectionRef, {
            email: data.email,
            password: data.password,
            age:data.age
        })
            .then((res) => {
                alert("Data Added")
            })
            .catch((err) => {
                alert(err.message)
            })















        // createUserWithEmailAndPassword(auth, data.email, data.password)
        //     // email is coming from data
        //     .then((response) => {
        //         // Signed in 
        //         console.log(response.user);
        //         // const user = response.user;

        //         // ...
        //     })
        //     .catch((error) => {
        //         const errorCode = error.code;
        //         // const errorMessage = error.message;
        //         alert(error.message)

        //         // ..
        //     });



        //  signInWithEmailAndPassword  

        // signInWithEmailAndPassword(auth, data.email, data.password)
        //     .then((userCredential) => {
        //         // Signed in 
        //         const user = userCredential.user;
        //         console.log(userCredential.user);
        //         // ...
        //     })
        //     .catch((error) => {
        //         alert(error.message);
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //     });





    }


    // to read data , getDocs-read data but not update data without page refresh
    const getData = () => {

        // console.log("ageQury",ageQuery);


        // getDocs(collectionRef).then((res) => {


        //     // setFdata(res);

        //     console.log(res.docs.map((item) => {
        //         setFdata(item.data());

        //         // console.log(" fdata",item.data(),item.id);

        //         return { ...item.data(), id: item.id }
        //         // reading data in console
        //     })
        //     );

        // })
        //     .catch((err) => {

        //         console.log("err");
        //     })


        
        
 //geeting live data without refershing page udsing Onsnapshot It's a kind of "get and forget": If the document changes in the (back-end) Firestore database you will need to call get() again to see the change. On the opposite, if you use the onSnapshot() method you constantly listen to a document as explained in the doc: You can listen to a document with the onSnapshot() method.

        //    data param inside callfaction return everytime(bcz of OnSnapshot) when ever data changed
        
        onSnapshot(nameQuery, (data) => {

            console.log("filter-query",
                data.docs.map((item) => {
                return item.data();

                }
                )
            )

        }
        )

        // onSnapshot(ageQuery).then((res=>{
        //     console.log(res.docs.map((item)=>{
        //         return item.data();

        //     })
        //     );
        // }))
        // .catch(err=>{
        //     alert(err.message);
        // })

    }

    useEffect(()=>{
        getData();
        console.log("snapshot");
    },[])



    // to UPDATE DATA IN FIREBASE "updataDoc"

    // const updateData = () => {

    //     const updateUserData = doc(collectionRef, "a3IzwC7PH6M3k388ZcDo");
    //     // doc(database, "users", "a3IzwC7PH6M3k388ZcDo")

    //     //collection name-"database"

    //     updateDoc(updateUserData, {
    //         email: "updatedwithref",
    //         password: 123456
    //     }).then(res => {
    //         alert("Updated")
    //         console.log();
    //     }).catch(err => {
    //         alert(err.message)
    //     })



    // }


    // To DELETE DATA FROM FIREBASE

    // const deleteData = () => {

    //     const updateUserData = doc(collectionRef, "kGf6cHkqMs8bXu288PK2");

    //     deleteDoc(updateUserData).then(() => {
    //         alert("Data Deleted");

    //     }).catch(() => {
    //         alert("error")
    //     })



    // }

    const handleSubmit = () => {
        console.log(data);
        // if (!data) {
        //     alert("Please choose a file first!")
        // }

        //    console.log(e.target.value);
        const storageRef = ref(storage, `images/${data.name}`);
        //data.name -name of file
        // 'images/${data.name} - creating images folder in firebase storage and sending images in that folder

        const uploadTask = uploadBytesResumable(storageRef, data);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                // switch (snapshot.state) {
                //     case 'paused':
                //         console.log('Upload is paused');
                //         break;
                //     case 'running':
                //         console.log('Upload is running');
                //         break;
                // }
            },
            (error) => {
                console.log(error.message)
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                });
            }
        );

    }




    return (

        <>
            <Form onClick={handleInput}> 


             <Form.Group className="mb-3" controlId="formBasicEmail"> 
             <Form.Label>Email address</Form.Label>

                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        //  onChange={(event) => handleInput(event)} 
                        onChange={event => handleInput(event)}

                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={event => handleInput(event)}
                        />
                        
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicAge">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="age"
                        placeholder="age"
                        name="age"
                        onChange={event => handleInput(event)}
                        />
                        
                </Form.Group>


             {/* <div>
                <input type='file' onChange={(event) => setData(event.target.files[0])} /> for sending file in firebase

                 <Button variant="primary" onClick={handleSubmit}>upload</Button>

            </div> */}

        
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>


            {/* <Button variant="primary" type="submit" onClick={handleSubmit}> */}


            </Form>
            
            <Button variant="primary" type="submit" onClick={handleSubmit7}>Submit</Button>


            {/* <Button variant="primary" type="save" onClick={getData}> */}
            {/* <Button variant="primary" type="save" onClick={updateData}> */}
            {/* <Button variant="primary" type="save" onClick={deleteData}> */}



        </>
    );
}



export default Register
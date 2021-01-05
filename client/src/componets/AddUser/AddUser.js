import React, { useState , useEffect } from 'react';
import axios from 'axios';
import {Form,Row,Col,Button} from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import './AddUser.css';

const AddUser = () => {

    
    const [user, setUser] = useState({
        name : '',
        email : '',
        photo : ''
    });

    const [file, setFile] = useState(null);

    const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    const renameFile =(originalFile, newName) => {
        return new File([originalFile], newName, {
            type: originalFile.type,
            lastModified: originalFile.lastModified,
        });
    }

    const onFileChange = event => { 
        let file_name = uuidv4();
        setUser({ ...user, photo: file_name});
        setFile(renameFile(event.target.files[0],file_name));
    }; 

    const onAddUser = (e) =>{
        e.preventDefault();
        console.log(user);

        let form = new FormData();
        Object.keys(user).forEach(key => form.append(key,user[key]));
        form.append('file',file);

        axios.post('http://127.0.0.1:5000/api/userlist/add_user',form).then(
            res =>{
                console.log(res);
            }
        )
    }

    return (
        <div className="adduser">
            <h1>Add user</h1>
            <Form onSubmit={(e)=>{onAddUser(e)}}>

                <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                    Name
                    </Form.Label>
                    <Col sm="5">
                    <Form.Control type="name" placeholder="Name" name="name" required onChange={(e)=>onChange(e)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                    Email
                    </Form.Label>
                    <Col sm="5">
                    <Form.Control  placeholder="Email" name="email" required onChange={(e)=>onChange(e)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                <Form.Label column sm="2">
                    Photo
                    </Form.Label>
                    <Col sm="5">
                    <Form.File id="exampleFormControlFile1" required onChange={(e)=>{onFileChange(e)}} />
                    </Col>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>

            </Form>
        </div>
    )
}

export default AddUser

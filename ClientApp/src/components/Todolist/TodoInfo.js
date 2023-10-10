import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


//Info Modal for the Todolist that describes 
//functionality and tech stack used 
export default function TodoInfo(args) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button style={{color: '"#00008B', textDecoration: 'none', fontWeight: 'bold'}} onClick={toggle}>
        About Todolist 
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>How It Was Made</ModalHeader>
        <ModalBody>
          This todo list is a comprised fully of React Bootstrap components. The interactivity of the 
          todo list is handled by React hooks and communication between components is handled by props and 
          callback functions. I use the axios library within a service layer to communicate with endpoints 
          set up within my Springboot Application. These endpoints communicate with the service layer of 
          the Springboot Application and utilize a JPARepository and JDBCTemplate to manipulate the MySQL database. 
          The content within the database is persisted via a Docker volume.
          (The changes are coordinated on the frontend with async functions and more React hooks).
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

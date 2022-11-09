import React, {useState} from "react";
import {Button, ButtonGroup, Col, Container, Dropdown, Form, InputGroup, Row} from "react-bootstrap";
import "../views/ManageUser.css"
export default function TypeFilter({ filter, setType, onFilter, type, stateText, setStateText }) {
    return (

        <>
            <Dropdown as={ButtonGroup}
            >
                <Button
                    variant="success"
                    onClick={() => {
                        setType("")
                        onFilter(filter, "");
                        setStateText("TYPE")
                    }}
                >
                    {stateText}
                </Button>
                <Dropdown.Toggle
                    split
                    variant="success"
                    id="dropdown-split-basic"
                />
                <Dropdown.Menu
                >
                    <Dropdown.Item
                        onClick={() => {
                            setStateText("ADMIN")
                            setType("ADMIN");
                            onFilter(filter, "ADMIN");
                        }}

                    >
                        ADMIN
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => {
                            setStateText("STAFF")
                            setType("STAFF");
                            onFilter(filter, "STAFF");
                        }}
                    >
                        STAFF
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
}

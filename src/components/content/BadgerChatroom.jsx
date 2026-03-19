import React, { useContext, useEffect, useState } from "react"
import { Col, Row, Pagination, Form, Button } from "react-bootstrap";
import BadgerMessage from "./BadgerMessage";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [loginStatus] = useContext(BadgerLoginStatusContext);

    const loadMessages = () => {
        fetch(`https://cs571api.cs.wisc.edu/rest/s26/hw6/messages?chatroom=${props.name}&page=${page}`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };

    const handlePost = (e) => {
        e.preventDefault();

        if (!title || !content) {
            alert("You must provide both a title and content!");
            return;
        }

        fetch(`https://cs571api.cs.wisc.edu/rest/s26/hw6/messages?chatroom=${props.name}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": CS571.getBadgerId()
            },
            credentials: "include",
            body: JSON.stringify({
                title: title,
                content: content
            })
        }).then(() => {
            alert("Successfully posted!");
            setTitle("");
            setContent("");
            setPage(1);
            loadMessages();
        });
    };

    const handleDelete = (id) => {
        fetch(`https://cs571api.cs.wisc.edu/rest/s26/hw6/messages?id=${id}`, {
            method: "DELETE",
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            },
            credentials: "include"
        }).then(() => {
            alert("Successfully deleted the post!");
            loadMessages();
        });
    };

    useEffect(loadMessages, [props.name, page]);

    useEffect(() => {
        setPage(1);
    }, [props.name]);

    return <>
        <h1>{props.name} Chatroom</h1>

        {
            loginStatus ? (
                <Form onSubmit={handlePost}>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="postTitle">Post Title</Form.Label>
                        <Form.Control
                            id="postTitle"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="postContent">Post Content</Form.Label>
                        <Form.Control
                            id="postContent"
                            as="textarea"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Form.Group>

                    <Button type="submit">Create Post</Button>

                </Form>
            ) : (
                <p>You must be logged in to post!</p>
            )
        }

        <hr/>
        {
            messages.length > 0 ?
                <Row>
                    {
                        messages.map(message => (
                            <Col xs={12} md={6} lg={4} key={message.id}>
                                <BadgerMessage
                                    id={message.id}
                                    title={message.title}
                                    poster={message.poster}
                                    content={message.content}
                                    created={message.created}
                                    isOwner={loginStatus === message.poster}
                                    onDelete={handleDelete}
                                />
                            </Col>
                        ))
                    }
                </Row>
                :
                <>
                    <p>There are no messages on this page yet!</p>
                </>
        }
        <Pagination>
            <Pagination.Item active={page === 1} onClick={() => setPage(1)}>1</Pagination.Item>
            <Pagination.Item active={page === 2} onClick={() => setPage(2)}>2</Pagination.Item>
            <Pagination.Item active={page === 3} onClick={() => setPage(3)}>3</Pagination.Item>
            <Pagination.Item active={page === 4} onClick={() => setPage(4)}>4</Pagination.Item>
        </Pagination>
    </>
}
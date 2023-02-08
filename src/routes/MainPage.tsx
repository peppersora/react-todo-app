import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useEffect } from "react";
import { DragDropContext, Droppable, DropResult, ResponderProvided } from "react-beautiful-dnd";
import { Helmet } from "react-helmet-async";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import MakeBoard from "../components/AddCategory";
import DroppableCard from '../components/Board';
import { todostate } from "../localstorage/atoms";
import { breakpoints, device } from "../styles/theme";

const Container = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: nowrap;
    align-items: flex-start;
    padding-top: 10px;
    background-color: ${(props) => props.theme.background.primary};
`;

const Box = styled.div`
    display: flex;

    ${device.xl} {
        width: ${breakpoints.lg};
    }

    width: 100%;
    min-width: ${breakpoints.sm};
    flex-direction: column;
    padding-top: 20px;
    position: relative;

    h1 {
        font-size: 48px;
        color: ${(props) => props.theme.color.link};
    }

    h4 {
        font-size: 16px;
        color: ${(props) => props.theme.color.primary};
    }
`;

const TrashButtonContainer = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: crimson;
    color: white;
    position: fixed;
    right: 30px;
    bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.5s ease-in-out;

    &.dragging-over {
        transform: scale(1.3);
    }

    svg {
        background-color: inherit;
        path {
            fill: white;
        }
    }
`;

const MainPage = () => {
    const [todos, setTodos] = useRecoilState(todostate);

    const onDragEnd = (
        { destination, source, type }: DropResult,
        _: ResponderProvided,
    ) => {
        if (!destination) return;
        if (type === 'category') {
            setTodos((prev) => {
                const entries = Object.entries(prev);
                const [temp] = entries.splice(source.index, 1);
                entries.splice(destination.index, 0, temp);
                return entries.reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
            });
        } else if (destination?.droppableId === 'trash') {
            setTodos((prev) => {
                const droppableId = source.droppableId;
                const cp = prev[droppableId].slice(0);
                cp.splice(source.index, 1);
                return {
                    ...prev,
                    [droppableId]: cp,
                };
            });
        } else {
            if (destination.droppableId === source.droppableId) {
                setTodos((prev) => {
                    const droppableId = source.droppableId;
                    const cp = prev[droppableId]
                        ? prev[droppableId].slice(0)
                        : [];
                    const [temp] = cp.splice(source.index, 1);
                    cp.splice(destination.index, 0, temp);

                    return {
                        ...prev,
                        [droppableId]: cp,
                    };
                });
            } else {
                setTodos((prev) => {
                    const srcDrop = source.droppableId;
                    const destDrop = destination.droppableId;
                    const srcTodos = prev[srcDrop]
                        ? prev[srcDrop].slice(0)
                        : [];
                    const destTodos = prev[destDrop]
                        ? prev[destDrop].slice(0)
                        : [];
                    const [temp] = srcTodos.splice(source.index, 1);
                    destTodos.splice(destination.index, 0, temp);

                    return {
                        ...prev,
                        [srcDrop]: srcTodos,
                        [destDrop]: destTodos,
                    };
                });
            }
        }
    };

    useEffect(() => {
        setTodos(todos);
    }, [todos]);

    return (
        <Box>
            <Helmet>
                <title>Hello, This is MainPage</title>
            </Helmet>
            {/* <h1>Hello, ReactJS Todo Challenge</h1>
            <h4>Should do below things</h4>
            <h4>1. Adding todo form and save todos to localstorage</h4>
            <h4>2. Deleting using drag</h4>
            <h4>3. Adding Category and moving between categories</h4> */}
            <MakeBoard/>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                    droppableId={'category'}
                    type={'category'}
                    direction={'horizontal'}
                >
                    {(p) => (
                        <Container ref={p.innerRef} {...p.droppableProps}>
                            {Object.keys(todos).map(
                                (t, index) =>
                                    todos[t] && (
                                        <DroppableCard
                                            key={t}
                                            index={index}
                                            droppableId={t}
                                            title={t}
                                            IToDo={todos[t]}
                                        />
                                    ),
                            )}
                            {p.placeholder}
                        </Container>
                    )}
                </Droppable>
                <Droppable droppableId={'trash'}>
                    {(p, s) => (
                        <>
                            <TrashButtonContainer
                                ref={p.innerRef}
                                {...p.droppableProps}
                                className={clsx(
                                    s.isDraggingOver && 'dragging-over',
                                )}
                            >
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    color={'white'}
                                    size={'lg'}
                                />
                            </TrashButtonContainer>
                            {p.placeholder}
                        </>
                    )}
                </Droppable>
            </DragDropContext>
        </Box>
    );
};

export default MainPage;



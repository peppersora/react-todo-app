// https://github.com/peppersora/react-todo-app.git
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import styled, { ThemeProvider } from "styled-components";
import { ColorState, defaultTodos, todostate } from "./localstorage/atoms";
import Clock from "./components/Clock";
import { ToggleSwitch } from "./components/ToggleSwitch";
import { loadTodos } from "./localstorage/localstorage";
import { darkTheme, lightTheme } from "./styles/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import MainRouter from "./routes/MainRouter";

const queryClient = new QueryClient();

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: ${(props) => props.theme.background.primary};
    color: ${(props) => props.theme.color.primary};
    display: flex;
    justify-content: center;
    overflow: scroll;
`;


const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;

`;


function App() {
  const [colorSelector] = useRecoilState(ColorState);
  // atom의 값 뿐만아니라 수정하는 값까지 가지고 오기위해 state를 사용
  const [, setToDos] = useRecoilState(todostate);
  // onDragEnd Fn은 드래그가 끝났을때 실행되는 함수
  useEffect(() => {
    setToDos(loadTodos() ?? defaultTodos);
}, [setToDos]);
 
  return (
    <HelmetProvider>
    <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={colorSelector === "dark" ? darkTheme : lightTheme}>
      <Helmet>
      <link
                            rel="preconnect"
                            href="https://fonts.googleapis.com"
                        />
                        <link
                            rel="preconnect"
                            href="https://fonts.gstatic.com"
                        />
                        <link
                            href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;400;600&display=swap"
                            rel="stylesheet"
                        />
      </Helmet>
     <Clock/>    
      <Container>
       <MainRouter/>
      </Container>
    </ThemeProvider>
    </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;

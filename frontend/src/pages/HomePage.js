import Calender from "../components/Calender"
import useFetch from '../useFetch'

const HomePage = () => {
    const [meetings, isPending, error] = useFetch("http://localhost:8080/api/tasks")

    return (
        <div className="app">
            {error && <div className="mx-80 my-4">{error}</div>}
            {isPending && <div className="mx-80 my-4">Loading...</div>}
            {meetings && <Calender meetings={meetings} />}
        </div>
    );
}

export default HomePage;
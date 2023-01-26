import Spinner from "../../../Components/Spinner";
import Card from "./Card";
import FormFiltre from "./FormFiltre";
import Modal from "./Modal";
import Pagination from "./Pagination";
import useProduit from "./useUsers";

export default function Dashboard() {
  const {
    users,
    isLoading,
    userInfo,
    errorInput,
    btn,
    updateUser,
    deleteUser,
    handleChange,
    resetId,
    updateForm,
  } = useProduit();

  return (
    <>
      {isLoading && <Spinner />}
      <FormFiltre />
      <div className="row gx-md-5 gy-5 pb-5">
        {users.map((user) => {
          return (
            <Card
              key={user.idUser}
              user={user}
              deleteUser={deleteUser}
              updateForm={updateForm}
            />
          );
        })}
      </div>
      <Modal
        userInfo={userInfo}
        errorInput={errorInput}
        btn={btn}
        updateUser={updateUser}
        handleChange={handleChange}
        resetId={resetId}
      />
      <Pagination />
    </>
  );
}

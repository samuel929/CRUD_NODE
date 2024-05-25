import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { DeleteUser, fetchUsers } from "../../queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "../../types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Home() {
  const history = useNavigate();
  const queryClient = useQueryClient();
  const { isPending, data } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const mutation = useMutation({
    mutationFn: DeleteUser,
    onSuccess: () => {
      toast.success("User deleted Successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return (
    <div className='flex items-center justify-center min-h'>
      {isPending ? (
        <div className='skeleton w-80 h-80'></div>
      ) : (
        <div className='text-center'>
          <h1>Users</h1>
          <div className='overflow-x-auto'>
            <table className='table'>
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Phone Number</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {data?.map((item: User) => (
                  <tr key={item._id}>
                    <th></th>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.phoneNumber}</td>
                    <td className='flex justify-between'>
                      <FaEye
                        color='blue'
                        onClick={() => {
                          history(`/users/${item._id}`);
                        }}
                        className='cursor-pointer'
                      />
                      <RiDeleteBin6Fill
                        onClick={() => {
                          mutation.mutate(item._id);
                        }}
                        color='red'
                        className='cursor-pointer'
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

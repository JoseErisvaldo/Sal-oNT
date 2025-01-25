import { useContext, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { AuthContext } from "../../components/Context/Auth";

export function Auth() {
  const { login } = useContext(AuthContext); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      await login(email, password);

    } catch (error) {
      setErrorMessage("Failed to sign in. Please check your credentials.");
    }
  };

  return (
    <div className="flex h-screen flex-col justify-center items-center">
      <Card className="w-96 ">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center "
        >
          <Typography variant="h3" color="white" className="font-bold p-4">
            Bem vindo
          </Typography>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              size="lg"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage && (
              <Typography variant="small" color="red" className="text-center">
                {errorMessage}
              </Typography>
            )}
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth type="submit" color="blue">
              Entrar
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

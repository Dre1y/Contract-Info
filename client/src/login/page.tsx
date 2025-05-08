import { useState } from "react";
import styled from "styled-components";
import { FaUser, FaEnvelope, FaLock, FaKey } from "react-icons/fa";

const GradientContainer = styled.div`
  display: flex;
  min-height: 100vh;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SidePanel = styled.div`
  flex: 1;
  background: url("/bg-login.png") center center/cover no-repeat;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 0 5vw;
  @media (max-width: 768px) {
    padding: 2rem;
    align-items: center;
    text-align: center;
  }
`;

const LogoWrapper = styled.div`
  position: absolute;
  top: 32px;
  left: 32px;
  z-index: 3;
  @media (max-width: 768px) {
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const LogoImg = styled.img`
  width: 140px;
  margin-bottom: 0;
  margin-left: 0;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
`;

const SideContent = styled.div`
  color: #fff;
  max-width: 400px;
  text-align: left;
  position: relative;
  z-index: 2;
`;

const Slogan = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 1.1;
  color: #fff;
  margin: 40px 0 0 32px;
  text-align: left;
  z-index: 2;
  position: relative;
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin: 24px 0 0 0;
    text-align: center;
  }
`;

const ContentPanel = styled.div`
  flex: 1;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  background: #fff;
  padding: 2.5rem 2rem;
  border-radius: 10px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.07);
  width: 100%;
  max-width: 370px;
`;

const Title = styled.h1`
  font-size: 1.35rem;
  color: #222;
  margin-bottom: 0.2rem;
  font-family: "Roboto", Arial, Helvetica, sans-serif;
  font-weight: 700;
  letter-spacing: 0.01em;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 0.98rem;
  margin-bottom: 1.2rem;
  font-family: "Roboto", Arial, Helvetica, sans-serif;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1.1rem;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #b0b0b0;
  font-size: 1.1rem;
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  margin-left: 0.25rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem 0.7rem 0.7rem 2.5rem;
  border: 1px solid ${(props) => (props.error ? "#dc3545" : "#ccc")};
  border-radius: 5px;
  font-size: 1rem;
  background: #f6fafd;
  font-family: "Roboto", Arial, Helvetica, sans-serif;
  &:focus {
    outline: none;
    border-color: ${(props) => (props.error ? "#dc3545" : "#3a8dde")};
  }
`;

const Button = styled.button`
  width: 100%;
  background: linear-gradient(90deg, #00c98d 0%, #3a8dde 100%);
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.8rem;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: opacity 0.2s;
  font-family: "Roboto", Arial, Helvetica, sans-serif;
  &:hover {
    opacity: 0.9;
  }
`;

const ButtonSecondary = styled(Button)`
  background: #e9ecef;
  color: #222;
  margin-bottom: 0;
`;

const LinkButton = styled.button`
  background: none;
  border: none;
  color: #3a8dde;
  cursor: pointer;
  font-size: 0.95rem;
  margin-top: 0.5rem;
  text-decoration: underline;
  font-family: "Roboto", Arial, Helvetica, sans-serif;
`;

// Telas
function Login({ onChangeScreen }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "E-mail é obrigatório";
    if (!formData.password) newErrors.password = "Senha é obrigatória";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Lógica de login aqui
      console.log("Formulário válido");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpa o erro quando o usuário começa a digitar
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <Card>
      <Title>Login</Title>
      <Subtitle>
        Preencha os campos abaixo com os seus dados de acesso.
      </Subtitle>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <InputIcon>
            <FaEnvelope />
          </InputIcon>
          <Input
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </InputGroup>
        <InputGroup>
          <InputIcon>
            <FaLock />
          </InputIcon>
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </InputGroup>
        <Button type="submit">Acessar</Button>
      </form>
      <ButtonSecondary onClick={() => onChangeScreen("register")}>
        Criar minha conta
      </ButtonSecondary>
      <LinkButton onClick={() => onChangeScreen("forgot")}>
        Esqueceu sua senha?
      </LinkButton>
    </Card>
  );
}

function Register({ onChangeScreen }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Usuário é obrigatório";
    if (!formData.email) newErrors.email = "E-mail é obrigatório";
    if (!formData.password) newErrors.password = "Senha é obrigatória";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Lógica de registro aqui
      console.log("Formulário válido");
      // Redireciona para a tela de login após o cadastro
      onChangeScreen("login");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <Card>
      <Title>Criar conta</Title>
      <Subtitle>
        Preencha os campos abaixo com os seus dados de acesso.
      </Subtitle>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <InputIcon>
            <FaUser />
          </InputIcon>
          <Input
            type="text"
            name="username"
            placeholder="Digite seu usuário"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
          />
          {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
        </InputGroup>
        <InputGroup>
          <InputIcon>
            <FaEnvelope />
          </InputIcon>
          <Input
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </InputGroup>
        <InputGroup>
          <InputIcon>
            <FaLock />
          </InputIcon>
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </InputGroup>
        <Button type="submit">Cadastrar</Button>
      </form>
      <LinkButton onClick={() => onChangeScreen("login")}>
        Já tem uma conta? Entrar.
      </LinkButton>
    </Card>
  );
}

function Forgot({ onChangeScreen }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Usuário é obrigatório";
    if (!formData.email) newErrors.email = "E-mail é obrigatório";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onChangeScreen("otp");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <Card>
      <Title>Esqueceu a senha</Title>
      <Subtitle>
        Preencha os campos abaixo com os seus dados de acesso.
      </Subtitle>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <InputIcon>
            <FaUser />
          </InputIcon>
          <Input
            type="text"
            name="username"
            placeholder="Digite seu usuário"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
          />
          {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
        </InputGroup>
        <InputGroup>
          <InputIcon>
            <FaEnvelope />
          </InputIcon>
          <Input
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </InputGroup>
        <Button type="submit">Próximo</Button>
      </form>
    </Card>
  );
}

function OTP({ onChangeScreen }) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (otp.some((digit) => !digit)) {
      newErrors.otp = "Todos os dígitos são obrigatórios";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onChangeScreen("newpass");
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        const nextInput = e.target.nextElementSibling;
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = e.target.previousElementSibling;
      if (prevInput) prevInput.focus();
    }
  };

  return (
    <Card>
      <Title>Verificação de Código OTP</Title>
      <Subtitle>Digite abaixo o código enviado por e-mail.</Subtitle>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            justifyContent: "center",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          {otp.map((digit, index) => (
            <InputGroup key={index} style={{ flex: "0 0 auto" }}>
              <Input
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                style={{
                  width: "40px",
                  textAlign: "center",
                  paddingLeft: "0",
                  fontSize: "1.2rem",
                  letterSpacing: "2px",
                }}
                error={errors.otp}
              />
            </InputGroup>
          ))}
        </div>
        {errors.otp && (
          <ErrorMessage style={{ textAlign: "center" }}>
            {errors.otp}
          </ErrorMessage>
        )}
        <Button type="submit">Próximo</Button>
      </form>
    </Card>
  );
}

function NewPass({ onChangeScreen }) {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.password) newErrors.password = "Senha é obrigatória";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirmação de senha é obrigatória";
    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Lógica de atualização de senha aqui
      console.log("Formulário válido");
      // Redireciona para a tela de login após criar a nova senha
      onChangeScreen("login");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <Card>
      <Title>Criar nova senha</Title>
      <Subtitle>
        Preencha os campos abaixo com os seus dados de acesso.
      </Subtitle>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <InputIcon>
            <FaKey />
          </InputIcon>
          <Input
            type="password"
            name="password"
            placeholder="Digite sua nova senha"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </InputGroup>
        <InputGroup>
          <InputIcon>
            <FaKey />
          </InputIcon>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirme sua nova senha"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
          )}
        </InputGroup>
        <Button type="submit">Salvar</Button>
      </form>
    </Card>
  );
}

function App() {
  const [screen, setScreen] = useState("login");

  return (
    <GradientContainer>
      <SidePanel>
        <LogoWrapper>
          <LogoImg src="../assets/logo-getinfo.png" alt="Logo Getinfo" />
        </LogoWrapper>
        <Slogan>
          VOCÊ TEM A IDEIA,
          <br />
          NÓS TEMOS A SOLUÇÃO
        </Slogan>
        <SideContent>{/* ... */}</SideContent>
      </SidePanel>
      <ContentPanel>
        {screen === "login" && <Login onChangeScreen={setScreen} />}
        {screen === "register" && <Register onChangeScreen={setScreen} />}
        {screen === "forgot" && <Forgot onChangeScreen={setScreen} />}
        {screen === "otp" && <OTP onChangeScreen={setScreen} />}
        {screen === "newpass" && <NewPass onChangeScreen={setScreen} />}
      </ContentPanel>
    </GradientContainer>
  );
}

export default App;

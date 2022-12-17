import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegisterForm } from "../Components/Auth/RegisterForm";
import * as alerts from '../Services/alertService';

const mockSuccessAlert = jest.spyOn(alerts, 'successAlert');
describe('RegisterForm', () => {

    beforeEach(() => {
        act(() => {
            render(<RegisterForm />);
        });
    });


    it('Verificar que los valores sean correctos', async () => {
        const inputName = screen.getByPlaceholderText("Nombre y Apellido");
        const inputEmail = screen.getByPlaceholderText("Email");
        const inputPassword = screen.getByPlaceholderText("Contraseña");
        const inputRepassword = screen.getByPlaceholderText("Repite la contraseña");
        
        userEvent.type(inputName, "Messi");
        userEvent.type(inputEmail, "messi@arg.com");
        userEvent.type(inputPassword, "Messi10!");
        userEvent.type(inputRepassword, "Messi10!");

        expect(inputName.value).toMatch("Messi");
        expect(inputEmail.value).toMatch("messi@arg.com");
        expect(inputPassword.value).toMatch("Messi10!");
        expect(inputRepassword.value).toMatch("Messi10!");

    })

    it('Verificar que no se envíe sin completar los campos', async () => {
        const inputName = screen.getByPlaceholderText("Nombre y Apellido");
        const inputEmail = screen.getByPlaceholderText("Email");
        const inputPassword = screen.getByPlaceholderText("Contraseña");
        
        userEvent.type(inputName, "Messi");
        userEvent.type(inputEmail, "messi@arg.com");
        userEvent.type(inputPassword, "Messi10!");

        userEvent.click(screen.getByRole("button", { name: /Registrarme/i }));

        await waitFor(() => {
            expect(mockSuccessAlert).not.toHaveBeenCalled();
        })
    })
    
    it('Verificar que se envíe correctamente el formulario', async () => {
        const inputName = screen.getByPlaceholderText("Nombre y Apellido");
        const inputEmail = screen.getByPlaceholderText("Email");
        const inputPassword = screen.getByPlaceholderText("Contraseña");
        const inputRepassword = screen.getByPlaceholderText("Repite la contraseña");
        
        userEvent.type(inputName, "Messi");
        userEvent.type(inputEmail, "messi@arg.com");
        userEvent.type(inputPassword, "Messi10!");
        userEvent.type(inputRepassword, "Messi10!");

        userEvent.click(screen.getByRole("button", { name: /Registrarme/i }));

        await waitFor(() => {
            expect(mockSuccessAlert).toHaveBeenCalled();
        })
    })
})
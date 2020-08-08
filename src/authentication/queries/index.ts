import AuthUserDto from '../dto/auth-user.dto';

export const resetPasswordQuery = (authUserDto: AuthUserDto): string => {
  const { email, password } = authUserDto;
  return `
        {  
            changePassword(email:"${email}",newPassword:"${password}",oldPassword:"${password}") {
                changed
            } 
        }
  `;
};

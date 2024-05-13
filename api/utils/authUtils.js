import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Fonction pour hacher un mot de passe
export const hashPassword = async (password) => {
const saltRounds = 10;
try {
return await bcrypt.hash(password, saltRounds);
} catch (error) {
console.error('Error hashing password:', error);
throw error;
}
};

// Fonction pour comparer un mot de passe non haché avec un haché
export const comparePassword = async (password, hashedPassword) => {
try {
return await bcrypt.compare(password, hashedPassword);
} catch (error) {
console.error('Error comparing password:', error);
throw error;
}
};

// Fonction pour générer un token JWT
export const generateToken = (user, secretSignature, options = { expiresIn: '1h' }) => {
const payload = {
id: user.id,
email: user.email
};
try {
return jwt.sign(payload, secretSignature, options);
} catch (error) {
console.error('Error generating JWT:', error);
throw error;
}
};

// Fonction pour vérifier un token JWT
export const verifyToken = (token, secretKey) => {
try {
return jwt.verify(token, secretKey);
} catch (error) {
console.error('Error verifying JWT:', error);
return null;
}
};
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; 

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Nuevo estado para la carga

    // Función auxiliar para obtener el perfil y establecer el estado del usuario
    const updateUserState = async (supabaseUser) => {
        if (!supabaseUser) {
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            // 1. Consultar la tabla 'profiles' usando el ID del usuario
            const { data: profile, error } = await supabase
                .from('profiles')
                .select('role') // 👈 ¡CLAVE! Solo necesitamos el rol
                .eq('id', supabaseUser.id)
                .single();

            if (error) throw error;

            // 2. Combinar el objeto user de Supabase con el rol del perfil
            const userWithRole = {
                ...supabaseUser, // id, email, etc.
                role: profile?.role || 'guest' // 👈 Añadir la propiedad 'role'
            };
            
            setUser(userWithRole);

        } catch (error) {
            console.error("Error al obtener el perfil del usuario:", error);
            // En caso de error, aún podemos establecer el usuario básico
            setUser(supabaseUser); 
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        // 1. Obtener la sesión inicial y actualizar el estado
        supabase.auth.getSession().then(({ data: { session } }) => {
            updateUserState(session?.user);
        });

        // 2. Escuchar cambios en la autenticación (login/logout)
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                // Cuando hay un evento de cambio (SIGN_IN, SIGN_OUT, etc.),
                // llamamos a la función de actualización del estado
                updateUserState(session?.user);
            }
        );

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    // Devolvemos el usuario con el rol y un estado de carga
    return { user, loading }; 
};
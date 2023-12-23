export const useGetErrorProps = (fieldState) => {
    const {error} = fieldState;
    return {
        status: Boolean(error) ? 'error' : null,
        helperText: error?.message,
    }
}
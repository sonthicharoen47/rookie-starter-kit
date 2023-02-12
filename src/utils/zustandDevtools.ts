export default function configZustandDevTools(
  name: string,
  actionName?: string
) {
  return {
    name: `${name}`,
    enabled: true,
    annonymousActionTypes: `${actionName || name}`,
  };
}

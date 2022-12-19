import { Skeleton as Ske } from 'antd';

export const Skeleton = (props) => {
  const type = props.type || 'default';
  const size = props.size || 'default';
  const active = props.active || false;
  const block = props.block || false;
  const loading = props.loading || false;
  

  return (
    <>
      {type === "default" && <Ske active={active} size={size} block={block} loading={loading}>{props.children}</Ske>}
      {type === "button" && <Ske.Button active={active} size={size} block={block} />}
      {type === "input" && <Ske.Input active={active} size={size} block={block} />}
      {type === "avatar" && <Ske.Avatar active={active} size={size} block={block} />}
    </>
  )
}

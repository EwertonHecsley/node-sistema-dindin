import Identity from './Identity';

export default class Entity<T> {
  private entityId: Identity;
  protected props: T;

  protected constructor(props: T, id?: Identity) {
    this.props = props;
    this.entityId = id ?? new Identity();
  }

  getValueId(): Identity {
    return this.entityId;
  }
}

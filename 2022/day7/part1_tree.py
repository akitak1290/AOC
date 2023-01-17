import os

class Node:
  # a node can:
  #   contains multiple int data type vars
  #   points to multiples child nodes
  # a node needs to:
  #   have exactly 1 parent node (except the starting node)
  #   expose methods to return all the data it contains and
  #   what its parent, children are
  def __init__(self, folder_name, parent_node=None):
    """
    Folder name although is not a unique id for each node in the tree,
    it can be used uniquely identify a child node of a specific node
    """
    self.files_size_list = []
    self.children_node_list = []
    self.parent_node = parent_node
    self.name = folder_name

  def populate(self, files_size_list, node_list):
    """
    Populate the Node
    """
    self.files_size_list.extend(files_size_list)
    self.children_node_list.extend(node_list)

  def get_parent(self):
    """
    Return reference to parent node
    """
    return self.parent_node

  def get_name(self):
    """
    Return the node name (folder name)
    """
    return self.name

  def get_data_sum_recursive(self):
    """
    Return the sum of the data list 
    and sum of all data from children nodes
    """

    # PRINT STATEMENT IN CLASS LIKE THIS IS BAD!
    sum = 0
    for file_size in self.files_size_list:
      sum += file_size

    if len(self.children_node_list) != 0:
      for child in self.children_node_list:
        sum += child.get_data_sum_recursive()

    return sum
  
  def get_data_sum_recursive_p1(self, valid_folders_sizes):
    """
    Get the sum of all the folders
    with size < 100000 through pass by reference
    """

    # PRINT STATEMENT IN CLASS LIKE THIS IS BAD!
    current_sum = 0
    for file_size in self.files_size_list:
      current_sum += file_size

    if len(self.children_node_list) != 0:
      for child in self.children_node_list:
        current_sum += child.get_data_sum_recursive_p1(valid_folders_sizes)

    if current_sum > 100000:
      print(f'remove folder {self.name} (size {current_sum})')
      current_sum = 0
    else:
      print(f'valid folder {self.name} (size {current_sum})')
      valid_folders_sizes.append(current_sum)
    return current_sum

  def get_children(self):
    """
    Return references to children nodes
    """
    return self.children_node_list

  def get_data_list(self):
    """
    Return data list
    """
    return self.files_size_list

  # def __str__(self):
  #   return f""


class Tree:
  # a tree needs to:
  #   have 1 starting node (with no parent)
  #   have a pointer to move between nodes
  #   track where the pointer is at anytime
  #   mark if a node has been read for its data
  def __init__(self, folder_name):
    """
    Create the root node
    """
    self.root_node = Node(folder_name) # no parent node
    self.current_node = self.root_node

  def return_to_root_node(self):
    """
    Go to root node
    """
    is_not_root = True
    while is_not_root:
      is_not_root = self.move_to_node('..')

  def get_data_sum_recursive(self, part=None):
    """
    Return the sum of the data list 
    and sum of all data from children nodes
    """
    if part == 'part1':
      valid_folders_sizes = []
      self.current_node.get_data_sum_recursive_p1(valid_folders_sizes)
      total_sum = 0
      for size in valid_folders_sizes:
        total_sum += size
      return total_sum
    
    return self.current_node.get_data_sum_recursive()
      
  def get_current_node(self):
    """
    Return the current node being pointed to
    """
    return self.current_node

  def populate_node(self, files_size_list, node_list):
    """
    Populate the current node
    """
    self.current_node.populate(files_size_list, node_list)

  def move_to_node(self, folder_name):
    """
    Change the current node to a child or parent node
    Return True if destination exist, False otherwise
    """

    if folder_name == '..':
      if self.current_node.get_parent() == None:
        return False

      self.current_node = self.current_node.get_parent()
      return True

    for node in self.current_node.get_children():
      if node.get_name() == folder_name:
        self.current_node = node
        return True
    
    return False
  

dir = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))

with open(os.path.join(dir, 'input.txt')) as file:
  line: str
  file_size_list = []
  node_list = []
  args = []
  # read line
  # if line is cd <folder_name>, call tree.move_to_node
  # if line is ls, read until the next line with $ and 
  # call tree.populate_node
  # if line starts with number, add to arr 1
  # if line starts with dir, add to arr 2

  # root node
  line = next(file)
  args = line.split()
  # create the tree
  tree = Tree(args[2])

  for line in file:
    args = line.split()

    if args[0] == '$': # command
      if args[1] == 'cd':
        # moving to new folder
        if len(file_size_list) != 0 or len(node_list) != 0:
          tree.populate_node(file_size_list, node_list)
          file_size_list = []
          node_list = []

        if not tree.move_to_node(args[2]):
          # invalid folder name
          raise ValueError('Invalid folder name')
      # elif line[1:3] == 'ls':
        # skip
    elif args[0] == 'dir':
      node_list.append(Node(args[1], tree.get_current_node()))
    elif args[0].isnumeric():
      file_size_list.append(int(args[0]))
    else:
      raise ValueError('Invalid input')

  # at end of file
  if len(file_size_list) != 0 or len(node_list) != 0:
    tree.populate_node(file_size_list, node_list)
    file_size_list = []
    node_list = []

  tree.return_to_root_node()
  print(tree.get_data_sum_recursive('part1'))
  
